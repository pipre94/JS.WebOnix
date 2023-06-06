import { Component, OnInit } from '@angular/core';
import { OnixBackService } from 'app/services/onix-back.service';
import { Console } from 'console';
import { Router } from '@angular/router';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    addUser:any=[];
    infoUser:any=[];
    isNewPassword:boolean=false;
    infoUserUpdate:any[];
    constructor(private userService:OnixBackService, private router: Router) { }

    ngOnInit() {}

    async onSubmit(){
      await this.getUserById(this.addUser.username);
            
    }

    validationUser(){
        if(this.infoUser.code == "200"){
            alert('Usuario no existe en el sistema');
            this.clearItem();
      }else{
        if(this.infoUser[0].password == this.addUser.password){
            this.router.navigate(['/menu-option']);
        }else{
            alert('Contraseña incorrecta');
            this.clearItem();            
        }
      }  
    }

    clearItem(){
    this.infoUser={};
    }

    async getUserById(userName){
    await this.userService.getUserByUser(userName).subscribe
        (
        (res) => {
            this.infoUser = res;
            this.validationUser();
        },
        (error) => {
        console.error(error);
        });
    }

    async updatePassword(){
        await this.userService.getUserByUser(this.addUser.username).subscribe
        (
        (res) => {
            this.infoUser = res;
            this.updateUserDb(this.infoUser[0].id,this.addUser);
        },
        (error) => {
        console.error(error);
        });
    }

    async updateUserDb(addUser,listUser){
        await this.userService.updateUser(addUser, listUser).subscribe({
          next: (response) => {
            console.log('la petición fue exitosa')
            alert('Contraseña actualizada!')
            this.infoUser ={}
            this.volver();
          }, 
          error: () =>{
            console.log('ocurrió un error al hacer la petición')
          }
        });
      }

    newPassword(){
        this.addUser= {};
        this.isNewPassword = true;
    }
    volver(){
        this.addUser= {};
        this.isNewPassword = false;
    }
}
