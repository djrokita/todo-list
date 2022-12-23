import { create_box } from './box';
import { create_button } from './button';
import { create_field } from './field';
import { getControl } from './utils';

export const CREATOR = {
    box: create_box,
    button: create_button,
    field: create_field,
    utils: {
        getControl,
    },
};
