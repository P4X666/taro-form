import { Picker } from '@tarojs/components';
import { useMemo } from 'react';
import { AtList, AtListItem } from 'taro-ui';

const FormPicker = (props) => {
  const {mode, range, value, onClick, onChange, hyphens = ' ', ...restProps } = props;

  const fullWidth = {flex: 1};

  const _onChange = (e) => {
    onChange && onChange(e.detail.value);
  };
  /** hyphens 连接符 默认是空字符串 */
  const showValue = () => {
    if (Array.isArray(value)) {
      let result = '';
      let i = 0;
      while (i < value.length) {
        result += hyphens + range[i][value[i]];
        i++;
      }
      return result;
    }

    if (value) {
      if ([ 'date', 'time' ].includes(mode) || !mode) {
        return value;
      }
      return range[value];
    }
    return undefined;
  };

  const renderValue = useMemo(() => {
    return showValue();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ range, value ]);
  return mode
    ? <Picker mode={mode} range={range} style={fullWidth} onChange={_onChange} {...restProps}>
      <AtList>
        <AtListItem
          arrow="right"
          extraText={renderValue}
        />
      </AtList>
    </Picker>
    : <AtList>
      <AtListItem
        arrow="right"
        extraText={value}
        onClick={onClick}
      />
    </AtList>;
};
FormPicker.type = 'FormItem';
export default FormPicker;
