import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PageSeo } from '../domain/page';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly site = 'https://conecta-oportunidad.web.app';

  set(page: PageSeo): void {
    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: page.index === false ? 'noindex, nofollow' : 'index, follow' });
    const url = `${this.site}${page.path}`;
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:image', content: page.image ?? `${this.site}/icons/icon-512x512.png` });
    const link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = url;
  }
}
