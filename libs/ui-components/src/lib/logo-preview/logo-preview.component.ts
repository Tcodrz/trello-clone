import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LogoPreviewSize } from "../../interface/logo-preview-size.enum";


@Component({
  selector: 'ui-logo-preview',
  templateUrl: './logo-preview.component.html',
  styleUrls: ['./logo-preview.component.scss'],
})
export class LogoPreviewComponent implements AfterViewInit{
  @Input() name: string = '';
  @Input() size: LogoPreviewSize = LogoPreviewSize.Medium;
  @ViewChild('logoContainer') logoContainer!: ElementRef;
  @ViewChild('letter') logoLetter!: ElementRef;

  ngAfterViewInit(): void {
    switch (this.size) {
      case LogoPreviewSize.Small:
        this.setLogoSize(21, 21);
        this.setLetterFontSize(16);
        break;
      case LogoPreviewSize.Medium:
        this.setLogoSize(32, 32);
        this.setLetterFontSize(22);
        break;
      case LogoPreviewSize.Large:
        this.setLogoSize(95, 100);
        this.setLetterFontSize(72);
        break;
    }
  }

  private setLogoSize(width: number, height: number): void {
        this.logoContainer.nativeElement.style.width = `${width}px`;
        this.logoContainer.nativeElement.style.height = `${height}px`;
  }

  private setLetterFontSize(size: number): void {
    this.logoLetter.nativeElement.style.fontSize = `${size}px`;
  }
}
