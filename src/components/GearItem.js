import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import styles from 'style/gear-item.scss';

@cssModules(styles)
export default class GearItem extends Component {
  static propTypes = {
    styles: PropTypes.object,
    item: PropTypes.object.isRequired,
    removeGearItem: PropTypes.func.isRequired
  };

  removeGearItem() {
    this.refs.row.classList.add(styles.removed);
    setTimeout(() => {
      this.refs.row.classList.remove(styles.removed);
      this.props.removeGearItem(this.props.item);
    }, 200);
  }

  render() {
    const { styles, item } = this.props;

    return (
      <tr ref="row">
        <td className={styles.image}>
          <img src={item.image} className={styles.thumbnail} />
        </td>
        <td className={styles.name}>{item.name}</td>
        <td className={styles.weight}>{item.weight} lb</td>

        <td className={styles.remove}>
          <button onClick={this.removeGearItem.bind(this)}></button>
        </td>
      </tr>
    );
  }
}
