import * as contentful from 'contentful';

export type Track = {
  name: contentful.EntryFields.Text;
  description: contentful.EntryFields.Text;
  position: contentful.EntryFields.Number;
  distance: contentful.EntryFields.Text;
  images: contentful.Entry<ImageFile>[];
  isCircular: contentful.EntryFields.Text;
  kml: contentful.EntryFields.Text;
  maxAltitude: contentful.EntryFields.Text;
  minAltitude: contentful.EntryFields.Text;
  negativeGradient: contentful.EntryFields.Text;
  positiveGradient: contentful.EntryFields.Text;
  totalTime: contentful.EntryFields.Text;
  slug: contentful.EntryFields.Text;
  active: contentful.EntryFields.Boolean;
};

export type ImageFile = {
  title: contentful.EntryFields.Text;
  description?: contentful.EntryFields.Text;
  imageFile: contentful.Asset;
};
