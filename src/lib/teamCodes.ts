// Maps random UTM slugs → team member names
// These never change — each person's link is permanent
export const TEAM_CODES: Record<string, string> = {
  xk9m2: 'Shivam',
  bv7qw: 'Om',
  tn4rp: 'Vishal',
  jd8fy: 'Shlok',
  wc3hs: 'Pratham',
}

// Ready-to-share links for each team member
export const TEAM_LINKS = Object.entries(TEAM_CODES).map(([code, name]) => ({
  name,
  code,
  url: `https://reactova.com/creators-program?utm_source=${code}`,
}))
