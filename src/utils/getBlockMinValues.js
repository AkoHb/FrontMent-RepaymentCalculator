// load the default settings to avoid errors
import defaultValues from "../config/defaultValues";

// also load current configuration file and get the values from it
import config from "../config/config";

export default function getBlockMinValues () {

    let width = !config.minBlockWidth || config.minBlockWidth < defaultValues.minColumnSize
        ? defaultValues.minColumnSize
        : config.minBlockWidth;

    let height = !config.minBlockHeight || config.minBlockHeight < defaultValues.minColumnHeight
    ? defaultValues.minColumnHeight
    : config.minBlockHeight;

    return [width, height];
}
