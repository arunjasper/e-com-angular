import { ChangeDetectorRef, Component, ElementRef, OnInit, inject, viewChild } from '@angular/core';
import { CartItem } from '../../../models/cart';
import { WishItem } from '../../../models/wishlist';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Product } from "../product/product";
import { Carousel } from '../../../shared/ui/carousel/carousel';
import { ToastService } from '../../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-product-details',
  imports: [Product, RouterLink, Carousel],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private toastService = inject(ToastService);
  private wishlistService = inject(WishlistService);

  backgroundPos: string = 'center center';
  startPosition: number = 0; // Position of active Slide
  readonly myCarousel = viewChild.required<ElementRef>("myCarousel");  // slider One Big Image  
  product: any
  productId!: number
  categoryId!: number
  imgNotFounded: boolean = false;
  cartList!: CartItem[];
  WishItems!: WishItem[];
  quantity!: number
  loremText: string = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, quos aspernatur eum dolorr eprehenderit eos et libero debitis itaque voluptatem! Laudantium modi sequi, id numquam liberosed quaerat. Eligendi, ipsum!`;
  categoryProducts: any
  isProductInWishList: boolean = false;
  productInCartList: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProduct();
      this.getCartList();
      this.getWishList();
    });
  }

  ZoomImage(event: any) {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.pageX - left) / width) * 100;
    const y = ((event.pageY - top) / height) * 100;
    this.backgroundPos = `${x}% ${y}%`;
  }

  nextSlide(event: any) {
    if (event.dragging == false) {
      this.startPosition = event.data.startPosition;
      const anyService = this.myCarousel() as any;
    }
  }

  getProduct() {
    this.productService.getSingleProduct(this.productId).subscribe((data) => {
      this.product = data;
      this.categoryId = data.category.id;
      this.getProductsByCategory(this.categoryId);
      this.productInCartList = this.checkProductInCartList(data);
      this.isProductInWishList = this.productInWishList(data);
      if (data.images.length == 1) {
        this.imgNotFounded = true
      }
    })
  }

  getCartList() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartList = cart?.items!;
      if (this.product) {
        this.productInCartList = this.checkProductInCartList(this.product);
      }
    });
  }

  getWishList() {
    this.wishlistService.wishList$.subscribe((cart) => {
      this.WishItems = cart?.items!;
      if (this.product) {
        this.isProductInWishList = this.productInWishList(this.product);
      }
    });
  }

  checkProductInCartList(product: any) {
    const cartItemExist = this.cartList?.find((item) => item.product.id === product.id);
    this.quantity = cartItemExist?.quantity || 0
    return cartItemExist;
  }

  productInWishList(product: any) {
    const WishItemExist = this.WishItems?.some((item) => item.product.id === product.id);
    return WishItemExist;
  }

  updateCartItemQuantity(value: number, product: any, operation: string) {
    if (operation == "+") {
      value++;
    } else {
      value--;
    }
    this.cartService.setCartItem(
      {
        product: product,
        quantity: value,
      },
      true
    );
  }

  addProductToCart(item: any) {
    const cartItem: CartItem = {
      product: item,
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
    this.toastService.show('Product added to cart successfully', 'success');
  }

  addProductToWishList(item: any) {
    const WishItem: WishItem = {
      product: item
    };
    if (this.isProductInWishList) {
      this.wishlistService.deleteWishItem(WishItem.product.id);
      this.toastService.show('Product removed from wishlist', 'error');
    }
    else {
      this.wishlistService.setWishItem(WishItem);
      this.toastService.show('Product added to wishlist successfully', 'success');
    }
  }

  getProductsByCategory(categoryId: number) {
    console.log(categoryId)
    this.productService.getProductsByCategory(categoryId).subscribe((data) => {
      this.categoryProducts = data;
    })
  }
}
