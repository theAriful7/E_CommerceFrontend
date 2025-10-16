import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { AddressesService } from 'src/app/services/addresses.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: Address[] = [];

  constructor(private addressService: AddressesService) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAllAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  deleteAddress(id: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe(() => {
        this.loadAddresses();
      });
    }
  }
}
