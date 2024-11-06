import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeUrl,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl',
  standalone: true,
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(
    value: string,
    type: 'url' | 'resource' = 'url'
  ): SafeUrl | SafeResourceUrl {
    if (type === 'resource') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    }
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
