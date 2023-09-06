import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../models/icontact.model';
import { Observable, catchError, throwError } from 'rxjs';
import { IGroup } from '../models/igroup.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private  serverUrl:string=`http://localhost:9000`;  //json-server url

  constructor(private httpClient:HttpClient) { }

  //GET All Contacts
  // http://localhost:9000/contacts
  public getAllContacts(): Observable<IContact[]>{
     let dataURL:string=`${this.serverUrl}/contacts`;
     return this.httpClient.get<IContact[]>(dataURL).pipe(catchError(this.handleError));
  }

  //GET Single Contact
  // http://localhost:9000/contacts/:contactId
  public getContact(contactId:string):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<IContact>(dataURL).pipe(catchError(this.handleError));
  }

  //Create a contact
  // http://localhost:9000/contacts
  public createContact(contact:IContact):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts`;
    return this.httpClient.post<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }

  //Update a contact
  // http://localhost:9000/contacts/:contactId
  public updateContact(contact:IContact,contactId:string):Observable<IContact>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<IContact>(dataURL,contact).pipe(catchError(this.handleError));
  }

   //Delete a contact
   // http://localhost:9000/contacts/:contactId
   public deleteContact(contactId:string):Observable<{}>{
    let dataURL:string=`${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(dataURL).pipe(catchError(this.handleError));
  }

  //GET All Groups
  public getAllGroups(): Observable<IGroup[]>{
    let dataURL:string=`${this.serverUrl}/groups`;
    return this.httpClient.get<IGroup[]>(dataURL).pipe(catchError(this.handleError));
 }

 //GET Single Group
 public getGroup(contact:IContact):Observable<IGroup>{
  let dataURL:string=`${this.serverUrl}/groups/${contact.groupId}`;
  return this.httpClient.get<IGroup>(dataURL).pipe(catchError(this.handleError));
}

  // Error Handling
  public handleError(error:HttpErrorResponse){
    let errorMessage:string='';
    if(error.error instanceof ErrorEvent){
      //client Error
      errorMessage=`Error : ${error.error.message}`
    }else{
      //server Error
      errorMessage= `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
