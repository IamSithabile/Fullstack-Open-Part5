import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("that Blog renders title and author", () => {
  const blog = {
    author: "Zwai",
    title: "How to masterfully be a master",
    url: "www.beamaster.com",
    likes: 563,
  };

  render(<Blog {...{ blog }} />);

  const titleElement = screen.getByText("How to masterfully be a master");
  const authorElement = screen.getByText("Zwai");
  const urlElement = screen.queryByText("www.beamaster.com");

  expect(titleElement).toHaveTextContent("How to masterfully be a master", {
    exact: false,
  });
  expect(authorElement).toHaveTextContent("Zwai");
  expect(urlElement).toBeNull();
});

test("that Blog renders title and author", () => {
  const blog = {
    author: "Zwai",
    title: "How to masterfully be a master",
    url: "www.beamaster.com",
    likes: 563,
  };

  render(<Blog {...{ blog }} />);

  const element = screen.getByText("How to masterfully be a master");

  expect(element).toBeDefined();
});
