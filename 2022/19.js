Object.fromEntries(
  [...sample.matchAll(/^Blueprint (\d+): [^\r\n]+$/gim)].map(
    ([text, blueprint]) => [
      blueprint,
      {
        resources: {},
        robots: { ore: 1 },
        cost: Object.fromEntries(
          [...text.matchAll(/Each ([^. ]+) robot costs ([^.]+)\./gi)].map(
            ([_, robot, resources]) => [
              robot,
              Object.fromEntries(
                [...resources.matchAll(/(\d+) (\w+)/gi)].map(
                  ([_, count, resource]) => [resource, parseInt(count)],
                ),
              ),
            ],
          ),
        ),
      },
    ],
  ),
);
