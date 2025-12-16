/**
 * Global Styles untuk Ahmeng Trade Mobile App
 * Design System dengan Dark Theme
 */

import { StyleSheet } from 'react-native';

// ==================== COLOR PALETTE ====================
export const colors = {
    // Background
    background: {
        primary: '#0a0a0a',      // Main background
        secondary: '#111111',    // Header background
        tertiary: '#1a1a1a',     // Card/Table background
        quaternary: '#1f1f1f',   // Input background
        dark: '#0f0f0f',         // Alternate row
        card: 'rgba(23, 23, 23, 0.5)', // Card with opacity
    },

    // Text
    text: {
        primary: '#fafafa',      // Main text
        secondary: '#a3a3a3',    // Muted text
        tertiary: '#666666',     // Placeholder
        muted: '#6b7280',        // Very muted
    },

    // Border
    border: {
        primary: '#262626',      // Main border
        secondary: '#404040',    // Input border
    },

    // Brand/Accent
    brand: {
        primary: '#2563eb',      // Blue primary
        primaryHover: '#3b82f6', // Blue hover
    },

    // Status
    status: {
        error: '#f87171',        // Error text
        errorBg: 'rgba(127, 29, 29, 0.5)', // Error background
        errorBorder: '#7c2d2d',  // Error border
        danger: '#dc2626',       // Danger button
        dangerDark: '#7f1d1d',   // Danger dark
    },

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.8)', // Modal backdrop
};

// ==================== TYPOGRAPHY ====================
export const typography = {
    // Font Sizes
    fontSize: {
        xs: 12,
        sm: 13,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
    },

    // Font Weights
    fontWeight: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },

    // Line Heights
    lineHeight: {
        tight: 16,
        normal: 20,
        relaxed: 24,
    },
};

// ==================== SPACING ====================
export const spacing = {
    xs: 4,
    sm: 6,
    md: 8,
    base: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
};

// ==================== BORDER RADIUS ====================
export const borderRadius = {
    sm: 4,
    base: 6,
    md: 8,
    lg: 12,
};

// ==================== SHADOWS (for elevation) ====================
export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
};

// ==================== COMMON STYLES ====================
export const commonStyles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },

    containerPadding: {
        paddingHorizontal: spacing.lg,
    },

    // Flex
    flexRow: {
        flexDirection: 'row',
    },

    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    flexCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Text Styles
    textPrimary: {
        color: colors.text.primary,
    },

    textSecondary: {
        color: colors.text.secondary,
    },

    textCenter: {
        textAlign: 'center',
    },

    textBold: {
        fontWeight: typography.fontWeight.bold,
    },

    textSemibold: {
        fontWeight: typography.fontWeight.semibold,
    },
});

// ==================== COMPONENT STYLES ====================

// Header Styles
export const headerStyles = StyleSheet.create({
    container: {
        paddingVertical: spacing['2xl'],
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },

    containerSecondary: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.background.secondary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
    },

    title: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
    },

    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.text.secondary,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logo: {
        width: 40,
        height: 40,
        borderRadius: borderRadius.base,
    },

    logoLarge: {
        width: 80,
        height: 80,
    },

    brandText: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginLeft: spacing.base,
    },
});

// Card Styles
export const cardStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.card,
        borderWidth: 1,
        borderColor: colors.border.primary,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.base,
    },

    title: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.primary,
    },

    value: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.xs,
    },

    description: {
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
    },
});

// Button Styles
export const buttonStyles = StyleSheet.create({
    // Primary Button (Light)
    primary: {
        backgroundColor: colors.text.primary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.base,
        alignItems: 'center',
        justifyContent: 'center',
    },

    primaryText: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: colors.background.primary,
    },

    // Secondary Button (Outlined)
    secondary: {
        borderWidth: 1,
        borderColor: colors.border.secondary,
        backgroundColor: colors.background.quaternary,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.base,
        flexDirection: 'row',
        alignItems: 'center',
    },

    secondaryText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },

    // Brand Button (Blue)
    brand: {
        backgroundColor: colors.brand.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.base,
    },

    brandText: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },

    // Danger Button (Red)
    danger: {
        backgroundColor: colors.status.danger,
        paddingVertical: spacing.base,
        borderRadius: borderRadius.base,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    dangerText: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },

    // Icon Button
    iconButton: {
        backgroundColor: colors.border.secondary,
        padding: spacing.sm,
        borderRadius: borderRadius.sm,
    },

    iconButtonDanger: {
        backgroundColor: colors.status.dangerDark,
        padding: spacing.sm,
        borderRadius: borderRadius.sm,
    },

    // Disabled State
    disabled: {
        opacity: 0.5,
    },
});

// Input Styles
export const inputStyles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },

    label: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },

    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border.secondary,
        backgroundColor: colors.background.quaternary,
        borderRadius: borderRadius.base,
        paddingHorizontal: spacing.base,
    },

    input: {
        flex: 1,
        color: colors.text.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSize.base,
    },

    inputSimple: {
        backgroundColor: colors.background.tertiary,
        borderWidth: 1,
        borderColor: colors.border.secondary,
        borderRadius: borderRadius.base,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.tertiary,
        borderWidth: 1,
        borderColor: colors.border.secondary,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
    },

    searchInput: {
        flex: 1,
        marginLeft: spacing.base,
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
        paddingVertical: spacing.md,
    },
});

// Table Styles
export const tableStyles = StyleSheet.create({
    header: {
        backgroundColor: colors.background.tertiary,
        borderTopLeftRadius: borderRadius.md,
        borderTopRightRadius: borderRadius.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.secondary,
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.border.primary,
    },

    headerText: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        textTransform: 'uppercase',
    },

    row: {
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: colors.border.primary,
        borderRightWidth: 1,
        borderRightColor: colors.border.primary,
    },

    rowEven: {
        backgroundColor: colors.background.dark,
    },

    rowOdd: {
        backgroundColor: colors.background.tertiary,
    },

    cellText: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },

    emptyState: {
        backgroundColor: colors.background.tertiary,
        borderBottomLeftRadius: borderRadius.md,
        borderBottomRightRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.border.primary,
        paddingVertical: spacing['3xl'],
        alignItems: 'center',
    },

    loadingState: {
        backgroundColor: colors.background.tertiary,
        borderBottomLeftRadius: borderRadius.md,
        borderBottomRightRadius: borderRadius.md,
        borderLeftWidth: 1,
        borderLeftColor: colors.border.primary,
        borderRightWidth: 1,
        borderRightColor: colors.border.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.primary,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing['4xl'],
    },
});

// Modal Styles
export const modalStyles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.lg,
    },

    container: {
        backgroundColor: colors.background.tertiary,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.border.primary,
        padding: spacing['2xl'],
        width: '100%',
        maxWidth: 400,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    iconContainer: {
        backgroundColor: colors.status.dangerDark,
        padding: spacing.base,
        borderRadius: borderRadius.md,
        marginRight: spacing.base,
    },

    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        flex: 1,
    },

    message: {
        fontSize: typography.fontSize.base,
        color: colors.text.secondary,
        marginBottom: spacing['2xl'],
        lineHeight: typography.lineHeight.normal,
    },

    buttonContainer: {
        flexDirection: 'row',
    },
});

// Alert/Error Styles
export const alertStyles = StyleSheet.create({
    container: {
        backgroundColor: colors.status.errorBg,
        borderWidth: 1,
        borderColor: colors.status.errorBorder,
        borderRadius: borderRadius.base,
        padding: spacing.base,
        marginBottom: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        fontSize: typography.fontSize.xs,
        color: colors.status.error,
        flex: 1,
    },
});

// Login/Auth Styles
export const authStyles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 320,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.border.primary,
        padding: spacing['2xl'],
    },

    headerContainer: {
        alignItems: 'center',
        marginBottom: spacing['2xl'],
    },

    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
    },

    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.text.secondary,
        marginTop: spacing.md,
        textAlign: 'center',
    },

    link: {
        fontSize: typography.fontSize.base,
        color: colors.text.primary,
        textDecorationLine: 'underline',
    },
});

// Stats/Metrics Styles
export const statsStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },

    item: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    value: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginTop: spacing.md,
    },

    label: {
        fontSize: typography.fontSize.xs,
        color: colors.text.secondary,
        marginTop: spacing.xs,
    },
});

// Section Styles
export const sectionStyles = StyleSheet.create({
    container: {
        paddingVertical: spacing['2xl'],
        paddingHorizontal: spacing.lg,
    },

    title: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.md,
    },

    subtitle: {
        fontSize: typography.fontSize.base,
        color: colors.text.secondary,
        marginBottom: spacing.lg,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },

    headerTitle: {
        color: colors.text.primary,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
    },
});

export default {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    commonStyles,
    headerStyles,
    cardStyles,
    buttonStyles,
    inputStyles,
    tableStyles,
    modalStyles,
    alertStyles,
    authStyles,
    statsStyles,
    sectionStyles,
};
