import {pipe} from 'ramda';
import GroupModel from './model';
import {filterFirst, filterById, throwError} from '../../helpers';

export const getGroups = ({first = 10, id}) =>
  GroupModel.find()
    .then(data => pipe(filterById(id), filterFirst(first))(data))
    .catch(throwError);

export const addGroup = () => null;
