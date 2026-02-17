export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`;

export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember"] | order(sortOrder asc)`;

export const FIELD_NOTES_QUERY = `*[_type == "fieldNoteItem"] | order(sortOrder asc)`;

export const FEATURED_NOTES_QUERY = `*[_type == "fieldNoteItem" && featured == true] | order(sortOrder asc)`;
