export default class Accessibility {
  static a11log(violations) {
    cy.task('log',
      `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${violations.length === 1 ? 'was' : 'were'} detected`
    );

    const violationData = violations.map(
      ({ id, impact, description, nodes }) => ({id, impact, description, nodes: nodes.length})
    );
      
    cy.task('table', violationData);
  }

  static validateAccessibility(accessibility_element = null, webContentAccesibility = ["cat.color"]) {
    cy.wait(5000);
    //[wcag2a, wcag2aa, cat.color]
    //https://github.com/dequelabs/axe-core/blob/master/doc/check-options.md
    //https://www.deque.com/axe/core-documentation/api-documentation/
    cy.injectAxe();
    cy.checkA11y(accessibility_element, {
      'runOnly': {type: 'tag', values: webContentAccesibility}, 
      'includedImpacts': ['critical', 'serious'],
      //'critical', 'serious', 'moderate', 'minor'
    },
    Accessibility.a11log);
  }
}
