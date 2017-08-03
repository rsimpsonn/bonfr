export default function GroupEmojis() {
  return {
    publications: '1f4f0',
    robotics: '1f916',
    modelunitednations: '1f30e',
    sailing: '26f5',
    struck: '1f58b',
    jazzband: '1f3b8',
    shift: '1f4a1',
    tommy: '1f477',
    shade: '1f4b8',
    debate: '1f468',
    photography: '1f4f7',
    dance: '1f3cc',
    crosscountry: '1f3c3',
    track: '1f3c3',
    cars: '1f3ce',
    boyslacrosse: '26a1',
  };
}

export function replaceAll(word) {
  if (word.indexOf(' ') === -1) {
    return word;
  }
  return replaceAll(word.replace(' ', ''));
}
