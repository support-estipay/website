import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from 'react';
import PropTypes from 'prop-types';

const DemoAudioContext = createContext(null);

/** Ensures only one demo recording plays at a time across walkthrough + snippets. */
export function DemoAudioProvider({ children }) {
    const playersRef = useRef(new Map());

    const register = useCallback((id, pause) => {
        playersRef.current.set(id, pause);
        return () => {
            playersRef.current.delete(id);
        };
    }, []);

    const notifyPlay = useCallback((activeId) => {
        playersRef.current.forEach((pause, id) => {
            if (id !== activeId) pause();
        });
    }, []);

    const value = useMemo(() => ({ register, notifyPlay }), [register, notifyPlay]);

    return (
        <DemoAudioContext.Provider value={value}>
            {children}
        </DemoAudioContext.Provider>
    );
}

DemoAudioProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useDemoAudio() {
    return useContext(DemoAudioContext);
}
