import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private title: string = "WELCOME TO STAR WARS";
  private text: string = "Embark on an epic adventure across the vast galaxy of Star Wars, where every corner holds mysteries waiting to be uncovered, legendary tales to be told, and unforgettable characters to meet";
  private text1: string = "The galaxy is calling—ready to be explored like never before; "
  private speed: number = 50; 
  private typingIndexTitle: number = 0; 
  private typingIndex1: number = 0; 
  private typingIndex2: number = 0; 
  private audio!: HTMLAudioElement; //! -> no será null


  constructor() {}


  ngOnInit(): void {
    this.typeWriterTitle() //Escritura
  
    this.audio = document.getElementById('themeAudio') as HTMLAudioElement; //audio
    document.addEventListener("click", () => {
      this.playMusic();
    },
    {once: true}
    );

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopMusic();
      } else {
        this.playMusic();
      }
    });
  }

  //Music
  playMusic(): void {
    const audio = document.getElementById('themeAudio') as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Couldn't play the music", error);
      });
    }
  }
  
  stopMusic(): void {
    if (this.audio) {
      this.audio.pause();
    }
  }

  //Type title
  private typeWriterTitle(): void {
    const typeTitle = document.getElementById('title');
    if (typeTitle && this.typingIndexTitle < this.title.length) {
      typeTitle.innerHTML += this.title.charAt(this.typingIndexTitle);
      this.typingIndexTitle++;
      setTimeout(() => this.typeWriterTitle(), this.speed); 
    } else {
      this.typeWriterText1();
    }
  }
  //Type 1r texto
  private typeWriterText1(): void {
    const typewriter = document.getElementById('typewriter');
    if (typewriter && this.typingIndex1 < this.text.length) {
      typewriter.innerHTML += this.text.charAt(this.typingIndex1);
      this.typingIndex1++;
      setTimeout(() => this.typeWriterText1(), this.speed);
    } else {
      this.typeWriterText2();
    }
  }

  //Type 2n texto
  private typeWriterText2(): void {
    const typewriter1= document.getElementById('typewriter1');
    if (typewriter1 && this.typingIndex2 < this.text1.length) {
      typewriter1.innerHTML += this.text1.charAt(this.typingIndex2);
      this.typingIndex2++;
      setTimeout(() => this.typeWriterText2(), this.speed);
    }
  }

}


