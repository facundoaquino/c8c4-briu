import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { IStore } from '../../../models';
import { IOrder } from '../../../models/product';
import { OrderComponent } from '../order/order.component';
import { ProductsService } from '../../../services/Products.service';
import { CommonModule } from '@angular/common';
import { IProvince } from '../../../models/provinces';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { UploadLogo } from '../../../store/products/products.actions';
@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, OrderComponent, CommonModule, HttpClientModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;

  public orders: IOrder[] = [];
  public form: FormGroup;
  public provinces: IProvince[] = [];
  public localShipping: boolean = false;
  public errorFile: string = '';
  public errorFileExt: string = '';
  public fileLoaded: File = new File([], '');

  constructor(
    private readonly router: Router,
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private readonly service: ProductsService,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.min(100000), Validators.max(9999999999), Validators.pattern('^[0-9]*$'),]],
      province: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      number: ['', [Validators.required, Validators.minLength(1)]],
      floor: ['', Validators.maxLength(3)],
      department: ['', Validators.maxLength(3)],
      logoNameDisplay: ['']
    });
    this.service.getProvinces().subscribe(provinces => {
      this.provinces = provinces.provincias;
    });
  }

  handleFileInputChange(file: FileList | null): void {
    let maxSize: number = 50 * 1024 * 1024;
    const allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp', 'tiff', 'ico', 'psd', 'ai', 'eps'];

    this.errorFile = '';
    this.errorFileExt = '';
    if (file![0]?.size > maxSize) {
      this.errorFile = 'Subi un logo de menos de 50mb';
      this.form.get('logoNameDisplay')?.patchValue('');

      return;
    }
    if (file![0] && !allowedExt.includes(file![0].name.split('.').pop()!)) {
      this.errorFileExt = 'Extensiones permitidas: jpg, jpeg, png, gif, svg, bmp, webp, tiff, ico, psd, ai, eps';
      this.form.get('logoNameDisplay')?.patchValue('');
      return;
    }
    if (!file![0]) {
      this.form.get('logoNameDisplay')?.patchValue('');
      return;
    }
    this.form.get('logoNameDisplay')?.patchValue(file![0].name);
    this.fileLoaded = file![0];
  }

  onFileInputClick(_event: Event) {
    const inputFile = this.inputFile.nativeElement as HTMLInputElement;
    inputFile.click();
  }

  localShippingValidator(control: FormControl): Validators | null {
    if (this.localShipping && control.value === '') {
      return Validators.required;
    }
    return null; // No validation needed when not local shipping
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.store.selectSnapshot((state: IStore) => {
      this.orders = state.products.order;
    }
    );
  }

  setCheckShipping(event: MatCheckboxChange) {
    this.localShipping = event.checked;
    const controls = ['province', 'street', 'number', 'location'];
    controls.forEach(control => {
      this.form.get(control)?.setValidators([Validators.required]);
      this.form.get(control)?.updateValueAndValidity();
    });
    if (this.localShipping) {
      controls.forEach(control => {
        this.form.get(control)?.setValidators([]);
        this.form.get(control)?.updateValueAndValidity();
      });
    }
  }

  onBack() {
    this.router.navigateByUrl('/new-order');
  }

  sendMessage() {
    const message =encodeURIComponent(this.buildMessage()).replaceAll('space', '%0A');
    if (this.form.get('logoNameDisplay')?.value) {
      this.store.dispatch(new UploadLogo({ file: this.fileLoaded,
        name: this.form.get('name')?.value,
        lastname: this.form.get('lastname')?.value }));
    }
    window.open(`https://api.whatsapp.com/send/?phone=%2B5491165155683&text=${message}&type=phone_number&app_absent=0`);
  }

  buildMessage() {
    let text = '';
    const orders = this.store.selectSnapshot((state: IStore)=>
    state.products.order);
    orders.forEach((order, index) => {
      text = `${text } ➡ ${order.productName}`;
      text = `${text } space`;
      text = `${text } Unidades: ${order.quantity}`;
      text = `${text } space`;
      text = `${text } Total: 💲 ${order.totalPrice}`;
      text = `${text } space`;
      if (!((index+1) === orders.length)) {
        text = `${text } ----------------- `;
        text = `${text } space`;
      }
    });
    if (orders.length > 1) {
      text = `${text } ----------------- `;
      text = `${text } space`;
      text = `${text } Total: 💰 ${this.totalAmount }`;
    }
    text = `${text } space`;

    text = `${text } ----------------- `;
    text = `${text } space`;
    const { name,
      lastname,
      province,
      location,
      street,
      number,
      floor,
      department } = this.form.value;
      text = `${text } 👤 Cliente  `;
      text = `${text } space`;
      text = `${text }  Nombre: ${`${name } ${ lastname}`}`;
      text = `${text } space`;
      if (this.localShipping) {
      text = `${text } Retiro por local`;
      } else {
        text = `${text } 🏠 Direccion: ${`${street } ${ number}, ${ floor && `piso: ${ floor},`} ${ department && `departamento: ${ department},`} ${ province}, ${ location}`}`;
      text = `${text } space`;
      }
      if (this.form.get('logoNameDisplay')?.value) {
        text = `${text } space`;
        text = `${text } ----------------- `;
        text = `${text } space`;
        text = `${text } ✅ Logo enviado.`;
      }
    return text;
  }

  get totalAmount() {
    return this.orders.reduce((ord1, ord2: IOrder) =>{
      return ord1 + ord2.totalPrice;}, 0);
  }
}
