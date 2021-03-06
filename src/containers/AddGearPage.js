import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ui from 'redux-ui';
import cssModules from 'react-css-modules';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { gearListSelector } from 'selectors/gear-list-selectors';
import AddGearForm from 'components/AddGearForm';
import GearList from 'components/GearList';
import GearListList from 'components/GearListList';
import * as GearListActions from 'actions/gear-list';
import wrapActionCreators from 'utils/wrap-action-creators';
import styles from 'style/common.scss';

@cssModules(styles)
@ui({ key: 'addGearPage' })
@connect(gearListSelector, wrapActionCreators(GearListActions))
export default class AddGearPage extends Component {
  static propTypes = {
    gearList: PropTypes.object.isRequired,
    gearLists: PropTypes.array.isRequired,
    getGearLists: PropTypes.func.isRequired,
    addGearItem: PropTypes.func.isRequired,
    removeGearItem: PropTypes.func.isRequired,
    getGearListSuggestions: PropTypes.func.isRequired
  };

  componentWillMount() {
    // Prevent from making additional API requests when swapping between
    // gear pages
    if (!this.props.gearLists.length) {
      this.props.getGearLists();
    }
  }

  render() {
    const { gearList, gearLists, addGearItem, removeGearItem, getGearListSuggestions, routeParams, selectedGearList } = this.props;

    return (
      <Grid className={styles.grid}>
        <Row>
          <Col xs={3} md={3} className={styles.aside}>
            <GearListList gearLists={gearLists} selectedGearList={gearList.id} />
          </Col>

          <Col xs={9} md={9} className={styles.col}>
            <AddGearForm
              gearList={gearList}
              addGearItem={addGearItem}
              getGearListSuggestions={getGearListSuggestions}
            />

            <GearList
              gearList={gearList}
              removeGearItem={removeGearItem}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
