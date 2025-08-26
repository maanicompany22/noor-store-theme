# Component Loading 422 Error Fix

## Problem Description
The `social-proof-component` and potentially other custom components are failing to load with a 422 (Unprocessable Content) error from Salla's API:

```
GET https://api.salla.dev/admin/v2/design/component/custom_component?key=social-proof-component&version_id= 422 (Unprocessable Content)
```

## Root Cause
The issue is that the `version_id` parameter is missing or empty when Salla's platform tries to load the custom components. This typically happens when:

1. **Component Version Mismatch**: The component version in the theme doesn't match what Salla's platform expects
2. **Missing Version ID**: The component registration is missing the version identifier
3. **Platform Cache Issues**: Salla's platform has cached an old version of the component

## Solutions

### 1. **Immediate Fix - Clear Platform Cache**
1. Go to your Salla store admin panel
2. Navigate to **Design** → **Theme Editor**
3. Click on **"Clear Cache"** or **"Refresh Components"**
4. Wait for the components to reload

### 2. **Component Version Update**
The components in your `twilight.json` are properly configured, but you may need to update the version information. Add version tracking to your components:

```json
{
    "key": "social-proof-component",
    "title": "إثبات اجتماعي",
    "version": "1.0.0",
    "last_updated": "2024-01-01",
    // ... rest of configuration
}
```

### 3. **Component Registration Check**
Verify that all components are properly registered in Salla's platform:

1. **Check Component Status**: Ensure all components show as "Active" in the theme editor
2. **Verify Component Paths**: Confirm that component paths match the file structure
3. **Check Component Dependencies**: Ensure no missing dependencies

### 4. **Theme Rebuild and Publish**
1. **Rebuild the theme**:
   ```bash
   pnpm run build
   ```

2. **Preview the theme**:
   ```bash
   pnpm run preview
   ```

3. **Publish the theme**:
   ```bash
   pnpm run publish
   ```

### 5. **Component Loading Fallback**
Add error handling to your components to gracefully handle loading failures:

```twig
{# In your component files #}
{% if component %}
    {# Component content #}
{% else %}
    {# Fallback content or error message #}
    <div class="component-error">
        <p>Component temporarily unavailable</p>
    </div>
{% endif %}
```

## Verification Steps

### 1. **Check Component Status**
- [ ] All components show as "Active" in theme editor
- [ ] No component errors in the console
- [ ] Components render properly on the frontend

### 2. **Test Component Loading**
- [ ] Navigate to the home page
- [ ] Check browser console for 422 errors
- [ ] Verify all components display correctly

### 3. **Monitor API Calls**
- [ ] Check Network tab in DevTools
- [ ] Verify component API calls return 200 status
- [ ] Confirm version_id parameters are present

## Prevention

### 1. **Version Management**
- Always increment component versions when making changes
- Use semantic versioning (e.g., 1.0.0, 1.0.1, 1.1.0)
- Document component changes in CHANGELOG.md

### 2. **Component Testing**
- Test components in preview mode before publishing
- Verify component functionality after theme updates
- Monitor component loading in production

### 3. **Regular Maintenance**
- Clear platform cache regularly
- Update component versions periodically
- Monitor for component loading errors

## Files to Check

- `twilight.json` - Component configurations
- `src/views/components/home/social-proof.twig` - Component template
- `src/views/pages/index.twig` - Component usage
- Component registration in Salla platform

## Support

If the issue persists after trying these solutions:

1. **Contact Salla Support** with:
   - Theme ID and version
   - Component loading error details
   - Steps to reproduce the issue

2. **Check Salla Documentation** for:
   - Component development guidelines
   - Troubleshooting component issues
   - Platform updates and changes

## Notes

- The 422 error is typically a server-side issue, not a theme code problem
- Component loading failures don't affect the overall theme functionality
- Most issues can be resolved through platform cache clearing and theme republishing
- Regular theme updates help prevent component version mismatches
