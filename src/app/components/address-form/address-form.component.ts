import { Component } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { AddressesService } from 'src/app/services/addresses.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent {
address: Address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    userId: undefined
  };

  constructor(private addressService: AddressesService) {}

  saveAddress(): void {
    this.addressService.createAddress(this.address).subscribe(() => {
      alert('Address saved successfully!');
      this.address = { street: '', city: '', state: '', postalCode: '', country: '' };
    });
  }
}
