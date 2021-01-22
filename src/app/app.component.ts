import {Component, OnInit, Renderer2} from '@angular/core';
import {quote, QuoteI} from './quote';
;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  time = {
    hour: '0',
    min: '0',
  };
  image = '/assets/sun.svg';
  quote: QuoteI = {text: '', author: ''};
  color = 'light';
  constructor(private render: Renderer2) {
  }
  ngOnInit(): void {
    this.createTimeInterval();
    this.getRandomQuote();
    this.initTheme();
  }
  createTimeInterval(): void{
    this.setTime();
    setInterval(() => {
      this.setTime();
    }, 60000);
  }
  setTime(): void{
    this.time = {
      hour: this.checkForOneLetter(
        new Date().getHours()
      ),
      min: this.checkForOneLetter(
        new Date().getMinutes()
      ),
    };
  }
  checkForOneLetter(input: number): string{
    if (input.toString().length === 1){
      return `0${input}`;
    }
    return input.toString();
  }
  getRandomQuote(): void{
    this.quote = quote[Math.floor(Math.random() * quote.length)];
  }
  theme(): void{
    const theme = localStorage.getItem('theme') || 'white';
    if (theme === 'white'){
      this.color = 'dark';
      this.image = '/assets/moon.png';
      this.render.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    }else {
      this.color = 'white';
      this.image = '/assets/sun.svg';
      this.render.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'white');
    }
  }
  initTheme(): void{
    const theme = localStorage.getItem('theme') || 'white';
    if (theme === 'dark'){
      this.color = 'dark';
      this.image = '/assets/moon.png';
      this.render.addClass(document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    }else {
      this.color = 'white';
      this.image = '/assets/sun.svg';
      this.render.removeClass(document.body, 'dark');
      localStorage.setItem('theme', 'white');
    }
  }
}
