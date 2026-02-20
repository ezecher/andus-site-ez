export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]`;

export const HUMAN_OS_PAGE_QUERY = `*[_type == "humanOsPage"][0]`;

export const APPROACH_PAGE_QUERY = `*[_type == "approachPage"][0]`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(sortOrder asc)`;

export const FIELD_NOTES_QUERY = `*[_type == "fieldNoteItem"] | order(sortOrder asc) {
  _id,
  type,
  seriesLabel,
  title,
  description,
  "coverImageUrl": coverImage.asset->url,
  externalUrl,
  "pdfUrl": assetPdf.asset->url,
  featured,
  sortOrder
}`;

export const FEATURED_NOTES_QUERY = `*[_type == "fieldNoteItem" && featured == true] | order(sortOrder asc) {
  _id,
  type,
  seriesLabel,
  title,
  description,
  "coverImageUrl": coverImage.asset->url,
  externalUrl,
  "pdfUrl": assetPdf.asset->url,
  featured,
  sortOrder
}`;
