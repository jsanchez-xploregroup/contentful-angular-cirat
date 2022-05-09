export interface ContentfulQuery {
  content_type: string;
  locale: string;
  'fields.slug[in]'?: string;
}
