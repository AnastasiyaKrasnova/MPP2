import React from 'react';
import createReactClass from 'create-react-class'
import cx from 'classnames';
import './ColorPicker.less';

const COLORS = ['#FFFFFF', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#CFD8DC', '#FFD180'];

const ColorPicker = createReactClass({
    render() {
        return (
            <div className='ColorPicker'>
                {
                    COLORS.map(color =>
                        <div
                            key={color}
                            className={cx('ColorPicker__swatch', { selected: this.props.value === color })}
                            style={{ backgroundColor: color }}
                            onClick={this.props.onChange.bind(null, color)}
                        />
                    )
                }
            </div>
        );
    }
});

export default ColorPicker;