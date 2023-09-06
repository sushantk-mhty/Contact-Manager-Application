import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/icontact.model';
import { IGroup } from 'src/app/models/igroup.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.loading=true;
    this.activatedRoute.paramMap
      .subscribe({
        next: (param) => { 
          this.loading=false;
          this.contactId = param.get('contactId')
         },
        error:(error)=>{
          this.errorMessage=error;
          this.loading=false;
        }
      });
      if (this.contactId) {
        this.loading = true;
        this.contactService.getContact(this.contactId)
          .subscribe({
            next: (data: IContact) => {
              this.contact = data;
              this.loading = false;
              this.contactService.getAllGroups()
                .subscribe({
                  next: (data) => {
                    this.groups = data;
                  }
                }) 
            },
            error: (error) => {
              this.errorMessage = error; 
              this.loading = false;
            }
          });
      }
  }
  public onSubmitContact(){
    if(this.contactId){
    this.loading=true;
    this.contactService.updateContact(this.contact,this.contactId)
    .subscribe({
      next:(data)=>{
       this.router.navigate(['/']).then();
       this.loading=false;
      },
      error:(error)=>{
        this.router.navigate([`/contacts/edit/${this.contactId}`]).then();
        this.errorMessage=error;
        this.loading=false;
      }
    })
  }
  }
}
