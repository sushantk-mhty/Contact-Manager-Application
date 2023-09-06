import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IContact } from 'src/app/models/icontact.model';
import { IGroup } from 'src/app/models/igroup.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {
  public loading: boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public group: IGroup = {} as IGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private contactService: ContactService
  ) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe({
        next: (param) => { this.contactId = param.get('contactId') },
        error: (response) => { }
      });
    if (this.contactId) {
      this.loading = true;
      this.contactService.getContact(this.contactId)
        .subscribe({
          next: (data: IContact) => {
            this.contact = data;
            this.loading = false;
            this.contactService.getGroup(data)
              .subscribe({
                next: (data) => {
                  this.group = data;
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

  public isNotEmpty() {
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }
}
