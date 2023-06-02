import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-content',
    template: `    
    <!-- <div class="modal-body"> -->
    <!-- <div class="col-md-12 mr-auto ml-auto"> -->
    <!-- <div tabindex="-1" aria-labelledby="modal1" aria-hidden="true" class="modal fade"> -->
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <img src="./assets/img/vendido.jpg" alt="...">
            </div>
        </div>
    <!-- </div> -->
                <!-- </div> -->
<!-- </div> -->
    `
})
export class NgbdModalContent {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {}
}

@Component({
    selector: 'app-modal-component',
    templateUrl: './modal.component.html'
})
export class NgbdModalComponent {
    constructor(private modalService: NgbModal) {}
    open() {
        const modalRef = this.modalService.open(NgbdModalContent);
        modalRef.componentInstance.name = 'World';
    }
}
