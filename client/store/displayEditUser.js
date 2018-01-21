const DISPLAY_FORM = 'DISPLAY_FORM';

export function displayForm(displayBool) {
    return {
        type: DISPLAY_FORM,
        displayBool
    }
}

export default function displayFormReducer(state = '', action) {
    switch (action.type) {
        case DISPLAY_FORM:
            return action.displayBool;
        default:
            return state;
    }
}