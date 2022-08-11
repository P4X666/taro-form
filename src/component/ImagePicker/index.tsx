import classNames from "classnames";
import PropTypes, { InferProps } from "prop-types";
import React, { ReactNode } from "react";
import { Image, View } from "@tarojs/components";
import { ITouchEvent } from "@tarojs/components/types/common";
import Taro from "@tarojs/taro";
import { AtImagePickerProps, File } from "taro-ui/types/image-picker";

function uuid(len = 8, radix = 16): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
    ""
  );
  const value: string[] = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = "-";
    value[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join("");
}

interface MatrixFile extends Partial<File> {
  type: "blank" | "btn";
  uuid: string;
}

// 生成 jsx 二维矩阵
const generateMatrix = (
  files: MatrixFile[],
  col: number,
  showAddBtn: boolean
): MatrixFile[][] => {
  const matrix: Array<MatrixFile>[] = [];
  const length = showAddBtn ? files.length + 1 : files.length;
  const row = Math.ceil(length / col);
  for (let i = 0; i < row; i++) {
    if (i === row - 1) {
      // 最后一行数据加上添加按钮
      const lastArr = files.slice(i * col);
      if (!lastArr) continue;
      if (lastArr.length < col) {
        if (showAddBtn) {
          lastArr.push({ type: "btn", uuid: uuid() });
        }
        // 填补剩下的空列
        for (let j = lastArr.length; j < col; j++) {
          lastArr.push({ type: "blank", uuid: uuid() });
        }
      }
      matrix.push(lastArr);
    } else {
      matrix.push(files.slice(i * col, (i + 1) * col));
    }
  }

  return matrix;
};

const ENV = Taro.getEnv();

export interface ImagePickerProps extends Omit<AtImagePickerProps, "files"> {
  value: File[];
  children?: ReactNode;
}

export default class ImagePicker extends React.Component<ImagePickerProps> {
  public static propTypes: InferProps<ImagePickerProps>;
  public static defaultProps: ImagePickerProps;

  private chooseFile = (): void => {
    const { value = [], multiple, count, sizeType, sourceType } = this.props;
    const filePathName =
      ENV === Taro.ENV_TYPE.ALIPAY ? "apFilePaths" : "tempFiles";
    // const count = multiple ? 99 : 1
    const params: any = {};
    if (multiple) {
      params.count = 99;
    }
    if (count) {
      params.count = count;
    }
    if (sizeType) {
      params.sizeType = sizeType;
    }
    if (sourceType) {
      params.sourceType = sourceType;
    }
    Taro.chooseImage(params)
      .then(res => {
        const targetFiles = res.tempFilePaths.map((path, i) => ({
          url: path,
          file: res[filePathName][i]
        }));
        const newFiles = value.concat(targetFiles);
        this.props.onChange(newFiles, "add");
      })
      .catch(this.props.onFail);
  };

  private handleImageClick = (idx: number): void => {
    this.props.onImageClick &&
      this.props.onImageClick(idx, this.props.value[idx]);
  };

  private handleRemoveImg = (idx: number, event: ITouchEvent): void => {
    event.stopPropagation();
    event.preventDefault();
    const { value = [] } = this.props;
    if (ENV === Taro.ENV_TYPE.WEB) {
      window.URL.revokeObjectURL(value[idx].url);
    }
    const newFiles = value.filter((_, i) => i !== idx);
    this.props.onChange(newFiles, "remove", idx);
  };

  public render(): JSX.Element {
    const {
      className,
      customStyle,
      value = [],
      mode,
      length = 4,
      showAddBtn = true
    } = this.props;
    const rowLength = length <= 0 ? 1 : length;
    // 行数
    const matrix = generateMatrix(value as MatrixFile[], rowLength, showAddBtn);
    console.log(value, rowLength, showAddBtn, matrix, this.props.children);

    const rootCls = classNames("at-image-picker", className);

    return (
      <View className={rootCls} style={customStyle}>
        {matrix.map((row, i) => (
          <View className="at-image-picker__flex-box" key={i + 1}>
            {row.map((item, j) =>
              item.url ? (
                <View
                  className="at-image-picker__flex-item"
                  key={i * length + j}
                >
                  <View className="at-image-picker__item">
                    <View
                      className="at-image-picker__remove-btn"
                      onClick={this.handleRemoveImg.bind(this, i * length + j)}
                    ></View>
                    <Image
                      className="at-image-picker__preview-img"
                      mode={mode}
                      src={item.url}
                      onClick={this.handleImageClick.bind(this, i * length + j)}
                    />
                  </View>
                </View>
              ) : (
                <View
                  className="at-image-picker__flex-item"
                  key={"empty_" + i * length + j}
                >
                  {item.type === "btn" && (
                    <View onClick={this.chooseFile}>
                      {this.props.children || (
                        <View className="at-image-picker__item at-image-picker__choose-btn">
                          <View className="add-bar"></View>
                          <View className="add-bar"></View>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              )
            )}
          </View>
        ))}
      </View>
    );
  }
}

ImagePicker.defaultProps = {
  className: "",
  customStyle: "",
  value: [],
  mode: "aspectFill",
  showAddBtn: true,
  multiple: false,
  length: 4,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (): void => {}
};

ImagePicker.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  customStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.array,
  mode: PropTypes.oneOf([
    "scaleToFill",
    "aspectFit",
    "aspectFill",
    "widthFix",
    "top",
    "bottom",
    "center",
    "left",
    "right",
    "top left",
    "top right",
    "bottom left",
    "bottom right"
  ]),
  showAddBtn: PropTypes.bool,
  multiple: PropTypes.bool,
  length: PropTypes.number,
  onChange: PropTypes.func,
  onImageClick: PropTypes.func,
  onFail: PropTypes.func,
  count: PropTypes.number,
  sizeType: PropTypes.array,
  sourceType: PropTypes.array
};
