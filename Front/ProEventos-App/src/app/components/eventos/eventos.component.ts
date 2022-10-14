import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../models/Evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  modalRef?: BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public widthImg: number = 150;
  public marginImg: number = 2;
  public showImg: boolean = true;

  private _filterList: string = ''

  public get filterList() {
    return this._filterList;
  }

  public set filterList(value: string) {
    this._filterList = value;
    this.eventosFiltrados = this.filterList ? this.filtrarEventos(this.filterList) : this.eventos
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: {
        local: any; tema: string;
      }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }


  public alterarImagem() : void {
    this.showImg = !this.showImg;
  }

  public getEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos
      },
      error:(error: any) => {
        this.spinner.hide(),
        this.toastr.error('Erro ao caregar os eventos', 'Erro!')
      },
      complete: () => this.spinner.hide()

  });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.toastr.success('O evento foi deletado com sucesso.', 'Deletado!');
  }

  decline(): void {
    this.modalRef?.hide();
  }

}
