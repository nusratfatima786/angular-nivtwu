import { Component } from '@angular/core';

@Component({
  selector: 'footer-app',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  name = 'Mortage Calculator';

  goToLink() {
    window.open(
      'https://fcac-acfc.survey-sondage.ca/f/s.aspx?s=fbc0f47f-db46-494c-938c-e7279badb4d5&lang=EN',
      '_blank'
    );
  }
}
