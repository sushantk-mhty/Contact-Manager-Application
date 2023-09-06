import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/models/icontact.model';
import { IGroup } from 'src/app/models/igroup.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
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
    this.contactService.getAllGroups()
    .subscribe({
      next:(data)=>{
        this.groups=data;
        this.loading=false;
      },
      error:(error)=>{
        this.errorMessage=error;
        this.loading=false;
      }
    })
  }
  public onSubmitContact(){
    this.loading=true;
    this.contactService.createContact(this.contact)
    .subscribe({
      next:(data)=>{
       this.router.navigate(['/']).then();
       this.loading=false;
      },
      error:(error)=>{
        this.router.navigate(['/contacts/add']).then();
        this.errorMessage=error;
        this.loading=false;
      }
    })
  }
}
