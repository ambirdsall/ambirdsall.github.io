// TODO change something in the color besides its hue (saturation? lightness?) based on an
// index, magnitude of `number`, or something that will distinguish between different
// years with the same remainder
export default function numberToColor(number) {
  // I tried a Clever Hash Function which output a six-digit hex number, but
  // adjacent years generated REALLY similar colors, which is a pretty
  // undesirable property. Since I intend to color-code blog posts by year of
  // authoring, taking a list of >= 5 colors and accessing the index at (year %
  // length) ought to buy me enough time to find a couple more nice colors.
  //
  // Fun fact: I got this list by googling, verbatim, "nice hex colors".
  const niceColors = ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"]

  return niceColors[number % niceColors.length]
}
