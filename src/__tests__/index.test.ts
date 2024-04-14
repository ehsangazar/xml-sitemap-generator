import XMLSiteMapGenerator from "..";

jest.mock("fs", () => ({
  writeFile: jest.fn(),
}));
jest.mock("crawlee", () => ({
  CheerioCrawler: jest.fn().mockImplementation(() => ({
    run: jest.fn().mockResolvedValue(true),
    requestHandler: jest.fn().mockResolvedValue(true),
  })),
}));

describe("XMLSiteMapGenerator", () => {
  it("should generate a sitemap.xml file", async () => {
    const uri = "https://gazar.dev";
    await XMLSiteMapGenerator({ uri });
  });

  it("should generate a sitemap.xml file with a valid URL", async () => {
    const uri = "https://gazar.dev";
    await XMLSiteMapGenerator({ uri });
    expect(require("fs").writeFile).toHaveBeenCalledWith(
      "./sitemap.xml",
      expect.any(String),
      expect.any(Function)
    );
  });
});
