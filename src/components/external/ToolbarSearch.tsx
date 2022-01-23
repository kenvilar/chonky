/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

// import { selectSearchString } from '../../redux/selectors';
import { thunkUpdateSearchString } from '../../redux/thunks/files.thunks';
import { ChonkyIconName } from '../../types/icons.types';
import { getI18nId, I18nNamespace } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, important, makeGlobalChonkyStyles } from '../../util/styles';

export interface ToolbarSearchProps {}

export const ToolbarSearch: React.FC<ToolbarSearchProps> = React.memo(() => {
    const intl = useIntl();
    const searchPlaceholderString = intl.formatMessage({
        id: getI18nId(I18nNamespace.Toolbar, 'searchPlaceholder'),
        defaultMessage: 'Search',
    });

    const classes = useStyles();
    const ChonkyIcon = useContext(ChonkyIconContext);

    const searchInputRef = useRef<HTMLInputElement>();

    const dispatch = useDispatch();
    // const reduxSearchString = useSelector(selectSearchString);

    const [localSearchString, setLocalSearchString] = useState('');
    // const [debouncedLocalSearchString] = useDebounce(localSearchString, 2000);
    const [searchDisabled, setSearchDisabled] = useState(true);
    const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);

    // useEffect(() => {
    //     dispatch(
    //         reduxActions.setFocusSearchInput(() => {
    //             if (searchInputRef.current) searchInputRef.current.focus();
    //         })
    //     );
    //     return () => {
    //         dispatch(reduxActions.setFocusSearchInput(null));
    //     };
    // }, [dispatch]);

    // useEffect(() => {
    //     setShowLoadingIndicator(false);
    //     dispatch(thunkUpdateSearchString(debouncedLocalSearchString));
    // }, [debouncedLocalSearchString, dispatch]);

    const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        // setShowLoadingIndicator(true);
        if (event.currentTarget.value.trim()) {
            setSearchDisabled(false);
        }
        setLocalSearchString(event.currentTarget.value.trim());
        // setTimeout(() => {
        //     event.currentTarget.value = event.currentTarget?.value?.trim();
        // }, 1000);
    }, []);
    const handleKeyUp = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            // Remove focus from the search input field when user presses escape.
            // Note: We use KeyUp instead of KeyPress because some browser plugins can
            //       intercept KeyPress events with Escape key.
            //       @see https://stackoverflow.com/a/37461974
            if (event.key === 'Escape') {
                // setSearchDisabled(true);
                setLocalSearchString('');
                // dispatch(thunkUpdateSearchString(''));
                // if (searchInputRef.current) searchInputRef.current.blur();
            }
        },
        []
    );
    const handleOnClick = () => {
        setShowLoadingIndicator(true);
        setSearchDisabled(true);
        setTimeout(() => {
            dispatch(thunkUpdateSearchString(localSearchString));
            setShowLoadingIndicator(false);
            setSearchDisabled(false);
        }, 1000);
    };
    const className = c({
        [classes.baseButton]: true,
        [classes.activeButton]: !searchDisabled,
    });
    return (
        <>
            <TextField
                className={classes.searchFieldContainer}
                size="small"
                variant="outlined"
                value={localSearchString.trim()}
                placeholder={searchPlaceholderString}
                onChange={handleChange as any}
                onBlur={(e: any) => {
                    setTimeout(() => {
                        e.target.value = e.target?.value?.trim();
                    });
                }}
                inputRef={searchInputRef}
                InputProps={{
                    onKeyUp: handleKeyUp,
                    startAdornment: (
                        <InputAdornment className={classes.searchIcon} position="start">
                            <ChonkyIcon
                                icon={
                                    showLoadingIndicator
                                        ? ChonkyIconName.loading
                                        : ChonkyIconName.search
                                }
                                spin={showLoadingIndicator}
                            />
                        </InputAdornment>
                    ),
                    className: classes.searchFieldInput,
                }}
                inputProps={{ className: classes.searchFieldInputInner }}
            />
            <Button
                className={className}
                onClick={handleOnClick}
                title={'Submit'}
                disabled={searchDisabled || !handleOnClick}
            >
                <span>Submit</span>
            </Button>
        </>
    );
});

const useStyles = makeGlobalChonkyStyles((theme) => ({
    searchFieldContainer: {
        height: theme.toolbar.size,
        width: 150,
    },
    searchIcon: {
        fontSize: '0.9em',
        opacity: 0.75,
    },
    searchFieldInput: {
        lineHeight: important(0),
        padding: important(0),
        margin: important(0),
        fontSize: important(theme.toolbar.fontSize),
        borderRadius: theme.toolbar.buttonRadius,
        height: theme.toolbar.size - 4,
        paddingLeft: important(8),
        marginTop: 2,
    },
    searchFieldInputInner: {
        lineHeight: important(`${theme.toolbar.size - 4}px`),
        fontSize: important(theme.toolbar.fontSize),
        height: important(theme.toolbar.size - 4),
        padding: important([0, 8, 0, 0]),
        margin: important(0),
        '-webkit-appearance': 'none',
    },
    baseButton: {
        marginTop: 2,
        fontSize: important(theme.toolbar.fontSize),
        textTransform: important('none'),
        letterSpacing: important(0),
        minWidth: important('auto'),
        lineHeight: important(`${theme.toolbar.size - 4}px`),
        height: important(theme.toolbar.size - 4),
        paddingBottom: important(0),
        paddingTop: important(0),
    },
    iconWithText: {
        marginRight: 8,
    },
    iconOnlyButton: {
        width: theme.toolbar.size,
        textAlign: 'center',
    },
    iconDropdown: {
        fontSize: '0.7em',
        marginLeft: 2,
        marginTop: 1,
    },
    activeButton: {
        color: important(theme.colors.textActive),
    },
}));
