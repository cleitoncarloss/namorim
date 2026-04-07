# morph-alert

A temporary alert component that displays messages with different severity levels and auto-dismisses after a configurable duration.

## Usage

```html
<morph-alert type="info" duration="5000">
  Account verification required
</morph-alert>
```

## Attributes

### `type`
- Type: `'info' | 'error' | 'warning' | 'success'`
- Default: `'info'`
- The alert type that determines the styling and icon

### `duration`
- Type: `number`
- Default: `5000` (milliseconds)
- Time before the alert auto-dismisses. Set to `0` to disable auto-dismiss.

## Methods

### `show()`
Displays the alert and schedules auto-dismiss if duration > 0.

```javascript
alert.show()
```

### `hide()`
Hides the alert and clears the auto-dismiss timer.

```javascript
alert.hide()
```

## Events

### `show`
Fired when the alert is shown via the `show()` method.

```javascript
alert.addEventListener('show', (event) => {
  console.log('Alert was shown', event.detail)
})
```

### `hide`
Fired when the alert is hidden via the `hide()` method.

```javascript
alert.addEventListener('hide', (event) => {
  console.log('Alert was hidden', event.detail)
})
```

### `dismissed`
Fired when the alert is auto-dismissed after the duration timeout.

```javascript
alert.addEventListener('dismissed', (event) => {
  console.log('Alert was auto-dismissed', event.detail)
})
```

## Examples

### Basic Usage
```html
<morph-alert type="info" duration="5000">
  <strong>Account verification required</strong>
  <p>Please check your email and click the verification link.</p>
</morph-alert>
```

### Using with morph-on Directive

#### Show alert on button click
```html
<morph-button id="btn-save">Save Changes</morph-button>
<morph-alert id="alert-success" type="success" duration="3000" hidden>
  <strong>Success!</strong>
  <p>Your changes have been saved.</p>
</morph-alert>

<!-- Show alert when button is clicked -->
<morph-on value="btn-save/clicked:method/show"></morph-on>
```

#### Hide alert on button click
```html
<morph-button id="btn-close">Close</morph-button>
<morph-alert id="alert" type="info">
  <strong>Information</strong>
  <p>Click the button below to dismiss.</p>
</morph-alert>

<!-- Hide alert when button is clicked -->
<morph-on value="btn-close/clicked:method/hide"></morph-on>
```

#### Show alert with different conditions
```html
<!-- Show alert on form submission with error message -->
<morph-form id="form">
  <input type="text" />
</morph-form>
<morph-alert id="alert-error" type="error" duration="0" hidden>
  <strong>Please fix the following errors</strong>
  <p>Email is required</p>
</morph-alert>

<!-- Show alert on form error -->
<morph-on value="form/error:method/show"></morph-on>
```

## Styling

The component uses design tokens for colors:
- **Info**: `--color-info`, `--color-info-light`, `--color-info-dark`
- **Error**: `--color-danger`, `--color-danger-light`, `--color-danger-dark`
- **Warning**: `--color-warning`, `--color-warning-light`, `--color-warning-dark`
- **Success**: `--color-success`, `--color-success-light`, `--color-success-dark`
