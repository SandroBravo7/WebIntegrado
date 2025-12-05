import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Accessories } from 'src/app/models/accessories.model';
import { Food } from 'src/app/models/food.model';
import { Medicine } from 'src/app/models/medicine.model';
import { AccessoriesService } from 'src/app/services/accessories/accessories.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { MedicineService } from 'src/app/services/medicine/medicine.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavComponent } from 'src/app/shared/nav/nav.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NavComponent, HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  alimentos: Food[] = [];
  accesorios: Accessories[] = [];
  medicamentos: Medicine[] = [];
  productSelect: string = 'alimento';

  constructor(
    private foodService: FoodService,
    private accessoriesService: AccessoriesService,
    private medicineService: MedicineService,
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFoods();
    this.loadAccesories();
    this.loadMedicines();
  }

  loadFoods(): void {
    this.foodService.getAllFood().subscribe({
      next: (data) => (this.alimentos = data), 
      error: (e) => console.error('Error cargando alimentos', e),
    });
  }

  loadAccesories(): void {
    this.accessoriesService.getAllAccessories().subscribe({
      next: (data) => (this.accesorios = data), 
      error: (e) => console.error('Error cargando accesorios', e),
    });
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicine().subscribe({
      next: (data) => (this.medicamentos = data), 
      error: (e) => console.error('Error cargando medicinas', e),
    });
  }

  switchProduct(product: string): void {
    this.productSelect = product;
  }

  addToCart(product: any, quantity: number): void {
    const userId = this.loginService.userId;
    
    // Validación: Si no está logueado
    if (!userId) {
      alert('🔒 Debes iniciar sesión para comprar.');
      this.router.navigate(['/login']);
      return;
    }

    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) return;

    // Aseguramos el tipo de producto
    const type = this.getProductType(product);

    const itemData = {
      productId: product.id,
      productType: type,
      quantity
    };

    console.log('Enviando al carrito:', itemData); // Para depurar

    this.cartService.addItemToCartByUserId(userIdInt, itemData).subscribe({
      next: () => {
        const irAlCarrito = confirm('Producto agregado correctamente.\n¿Quieres ir al carrito a pagar?');
        
        if (irAlCarrito) {
          this.router.navigate(['/cart']);
        }
        // Si dice cancelar, se queda en la tienda para seguir comprando
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al agregar el producto. Inténtalo de nuevo.');
      }
    });
  }
  
  getProductType(product: any): string {
    if (product.productType) return product.productType;
    
    if (this.productSelect === 'alimento') return 'food';
    if (this.productSelect === 'accesorio') return 'accessories';
    if (this.productSelect === 'medicamento') return 'medicine';
    
    return 'food';
  }
  
}
