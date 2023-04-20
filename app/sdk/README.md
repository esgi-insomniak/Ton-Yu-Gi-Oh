# Insomniak SDK Analytics

Insomniak SDK Analytics is a powerful analytics tool for mobile apps that allows developers to track various user activities within their app. It provides insights into user behavior, allowing developers to make data-driven decisions for improving their app's user experience.

## Installation

To install the Insomniak SDK Analytics package, simply run the following command:

```bash
npm install insomniak-sdk-analytics

pnpm install insomniak-sdk-analytics

yarn add insomniak-sdk-analytics
```


## Usage

Once you have installed the package, you can import it into your project as follows:

```javascript
import InsomniakAnalytics from 'insomniak-sdk-analytics';
```

To start tracking user activities, you need to initialize the InsomniakAnalytics object with your app's API key, like so:

```javascript
<TrackingProvider>
    <App />
</TrackingProvider>
```

You can then start tracking user events by calling the track method on the analytics object, like this:

```javascript
// some page.tsx
import { useTrackEvent, useTrackingContext } from 'insomniak-sdk-analytics'
const { clientId, appId } = useTrackingContext()
const { ref } = useTrackEvent<HTMLButtonElement>({ tag: 'your-tag', type: 'click', clientId, appId })

fuction Page() {
    return (
        <button ref={ref}>Click me</button>
    )
}
```

## Features

Insomniak SDK Analytics provides the following features:

- **User activity tracking:** Track user activities within your app, such as button clicks, page views, and more.
- **Event properties:** Add additional properties to your tracked events to provide more context and insights into user behavior.
- **Real-time data:** View analytics data in real-time through the Insomniak dashboard.
- **Customizable dashboard:** Customize the Insomniak dashboard to show only the data you want to see.
- **Easy integration:** Integrates seamlessly with any mobile app, with just a few lines of code.

## Support

If you have any questions or issues with the Insomniak SDK Analytics package, please open an issues on the [GitHub repository](https://github.com/esgi-insomniak/Ton-Yu-Gi-Oh).

## License

This package is licensed under the MIT License. See the LICENSE file for more information.

## Contributing

We welcome contributions from the Insomniak team on GitHub. To contribute, please fork this repository, make your changes, and submit a pull request.

For more information on contributing to this repository, please contact the [Insomniak team](https://github.com/orgs/esgi-insomniak/teams/insominak).


