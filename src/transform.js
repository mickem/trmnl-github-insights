// TRMNL sandbox runtime transform.
// Paste the body of this file into Markup Editor > Transform tab.
// Prunes the 4 polled GitHub responses down to the fields the Liquid templates use,
// keeping the payload comfortably under TRMNL's 100kb limit.

function transform(input) {
  const repo = input.IDX_0 || {};
  const release = input.IDX_1 || {};
  const issues = input.IDX_2 || {};
  const pr = input.IDX_3 || {};

  return {
    IDX_0: {
      full_name: repo.full_name,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      subscribers_count: repo.subscribers_count,
      open_issues_count: repo.open_issues_count,
    },
    IDX_1: {
      tag_name: release.tag_name,
      published_at: release.published_at,
      body_html: release.body_html,
    },
    IDX_2: {
      total_count: issues.total_count,
      items: (issues.items || []).slice(0, 1).map(function (i) {
        return { title: i.title, body_html: i.body_html };
      }),
    },
    IDX_3: {
      total_count: pr.total_count,
    },
  };
}
