import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LogoPreviewSize } from "../../interface/logo-preview-size.enum";
import {
  LARGE_LOGO_FONT_SIZE,
  LARGE_LOGO_HEIGHT,
  LARGE_LOGO_WIDTH,
  MEDIUM_LOGO_FONT_SIZE,
  MEDIUM_LOGO_HEIGHT,
  MEDIUM_LOGO_WIDTH,
  SMALL_LOGO_FONT_SIZE,
  SMALL_LOGO_HEIGHT,
  SMALL_LOGO_WIDTH
} from "./logo-preview.const";

enum FontWeight {
  Normal = 400,
  Bold = 700,
  Bolder = 800
}

@Component({
  selector: 'ui-logo-preview',
  templateUrl: './logo-preview.component.html',
  styleUrls: ['./logo-preview.component.scss'],
})
export class LogoPreviewComponent implements AfterViewInit {
  @Input() name: string = '';
  @Input() size: LogoPreviewSize = LogoPreviewSize.Medium;
  @ViewChild('logoContainer') logoContainer!: ElementRef;
  @ViewChild('letter') logoLetter!: ElementRef;

  ngAfterViewInit(): void {
    switch (this.size) {
      case LogoPreviewSize.Small:
        this.setLogoSize(SMALL_LOGO_WIDTH, SMALL_LOGO_HEIGHT);
        this.setLetterFontSize(SMALL_LOGO_FONT_SIZE);
        this.setFontWeight(FontWeight.Normal);
        break;
      case LogoPreviewSize.Medium:
        this.setLogoSize(MEDIUM_LOGO_WIDTH, MEDIUM_LOGO_HEIGHT);
        this.setLetterFontSize(MEDIUM_LOGO_FONT_SIZE);
        this.setFontWeight(FontWeight.Bold);
        break;
      case LogoPreviewSize.Large:
        this.setLogoSize(LARGE_LOGO_WIDTH, LARGE_LOGO_HEIGHT);
        this.setLetterFontSize(LARGE_LOGO_FONT_SIZE);
        this.setFontWeight(FontWeight.Bolder);
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

  private setFontWeight(weight: FontWeight) {
    this.logoLetter.nativeElement.style.fontWeight = weight;
  }
}
