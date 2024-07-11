export default function formatTitle(title, maxLength = 40) {
    if (title.length <= maxLength) {
      return title;
    }
    const start = title.slice(0, maxLength / 2 - 1);
    const end = title.slice(-maxLength / 2 + 1);
    return `${start}...${end}`;
  }
  