import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const resizeRatio = (_width, _height, ratio, maxWidth) => {
  let options = [];
  const _ratio = ratio[1] / ratio[0];

  if (_height - 1 <= _width * _ratio && _width * _ratio <= _height + 1) {
    if (_width > maxWidth) options.push({ resize: { width: maxWidth } });
  } else if (_width * _ratio > _height) {
    options.push({
      crop: {
        originX: (_width - _height * _ratio) / 2,
        originY: 0,
        width: _height * _ratio,
        height: _height,
      },
    });
    if (_width > maxWidth) options.push({ resize: { width: maxWidth } });
  } else {
    options.push({
      crop: {
        originX: 0,
        originY: (_height - _width * _ratio) / 2,
        width: _width,
        height: _width * _ratio,
      },
    });
    if (_height > maxWidth * _ratio)
      options.push({ resize: { height: maxWidth * _ratio } });
  }

  return options;
};

export default async (result) => {
  const _width = result.width;
  const _height = result.height;

  return manipulateAsync(
    result.uri,
    resizeRatio(_width, _height, [1, 1], 600),
    { compress: 0.7, format: SaveFormat.JPEG }
  );
};
