// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IImagesFields {
  /** Title */
  title?: string | undefined;

  /** Image File */
  imageFile?: Asset | undefined;
}

export interface IImages extends Entry<IImagesFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "images";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITrackFields {
  /** Name */
  name: string;

  /** Slug */
  slug: string;

  /** Description */
  description: Document;

  /** Distance */
  distance: number;

  /** Is Circular */
  isCircular?: boolean | undefined;

  /** Max Altitude */
  maxAltitude: number;

  /** Min Altitude */
  minAltitude: number;

  /** Negative Gradient */
  negativeGradient?: number | undefined;

  /** Positive Gradient */
  positiveGradient?: number | undefined;

  /** Total time */
  totalTime: string;

  /** Images */
  images?: IImages[] | undefined;

  /** KML */
  kml?: Asset | undefined;

  /** Active */
  active?: boolean | undefined;
}

export interface ITrack extends Entry<ITrackFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "track";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE = "images" | "track";

export type LOCALE_CODE = "en-US" | "es";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
