import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/icontact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.scss']
})
export class ContactManagerComponent implements OnInit {

  public loading: boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(private contactService:ContactService) { }

  ngOnInit(): void {
    this.getAllContactsFromServer();
  }

  public getAllContactsFromServer(){
    this.loading=true;
    this.contactService.getAllContacts()
    .subscribe({
      next: (data)=>{
        this.contacts=data;
        this.loading=false;
      },
      error:(error)=>{
        this.errorMessage=error;
        this.loading=false;
      }
    });
  }

  public onDeleteContact(contactId:string | undefined){
    this.loading=true ;
    if(contactId){
      this.contactService.deleteContact(contactId)
       .subscribe({
        next:(data)=>{
          this.loading=false;
          this.getAllContactsFromServer();
        },
      error:(error)=>{
        this.errorMessage=error;
        this.loading=false;
      }
       });
    }

  }
}
