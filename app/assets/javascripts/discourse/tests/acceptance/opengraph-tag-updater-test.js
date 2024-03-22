import { click, visit } from "@ember/test-helpers";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";
import { test } from "qunit";

acceptance("Opengraph Tag Updater", function (needs) {
  needs.pretender((server, helper) => {
    server.get("/about", () => {
      return helper.response({});
    });
  });
  needs.site({});

  test("updates OG title and URL", async function (assert) {
    await visit("/");
    await click(
      ".sidebar-section[data-section-name='community'] .sidebar-more-section-links-details-summary"
    );
    await click("a[href='/about']");

    assert.strictEqual(
      document
        .querySelector("meta[property='og:title']")
        .getAttribute("content"),
      document.title,
      "it should update OG title"
    );
    assert.ok(
      document
        .querySelector("meta[property='og:url']")
        .getAttribute("content")
        .endsWith("/about"),
      "it should update OG URL"
    );
    assert.strictEqual(
      document
        .querySelector("meta[property='twitter:title']")
        .getAttribute("content"),
      document.title,
      "it should update OG title"
    );
    assert.ok(
      document
        .querySelector("meta[property='twitter:url']")
        .getAttribute("content")
        .endsWith("/about"),
      "it should update OG URL"
    );
  });
});