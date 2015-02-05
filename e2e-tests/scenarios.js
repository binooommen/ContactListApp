'use strict';

/* Assignment #2 End-to-End Testing
 * Prepared By: Len Payne
 * For: CPD-3262
 * 2014/01/21
 */
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Contact List App', function() {

  beforeEach(function() {
    browser().navigateTo('app/index.html');
  });

  it('should have six tr elements with the class "contact"', function() {
	expect(repeater('tr.contact').count()).toBe(6);
  });
  
  it('should filter on Cooper to only two results', function() {
	input('query').enter('Cooper');
    expect(repeater('tr.contact').count()).toBe(2);
  });

  it('should order correctly by Extension', function() {
	input('query').enter('33');
	select('orderProp').option('Extension');
	expect(repeater('tr.contact', 'Contact List').column('contact.first')).
          toEqual(["Liane", "Rick", "Samantha"]);
  });

  it('should order correctly by First Name', function() {
	input('query').enter('Cooper');
	select('orderProp').option('First Name');
	expect(repeater('tr.contact', 'Contact List').column('contact.first')).
          toEqual(["Jim", "Liane"]);
  });

  it('should order correctly by Last Name', function() {
	input('query').enter('L');
	select('orderProp').option('Last Name');
	expect(repeater('tr.contact', 'Contact List').column('contact.first')).
          toEqual(["Liane", "Len"]);
  });

  it('should render contact-specific links', function() {
    input('query').enter('Len');
	element('.contact td.first a').click();
	expect(browser().location().url()).toBe('/contacts/len');
  });
  
  it('should re-direct index.html to index.html#/contacts', function() {
	browser().navigateTo('app/index.html');
	expect(browser().location().url()).toBe('/contacts');
  });
});
describe('Contact List Detail View', function() {
  beforeEach(function() {
    browser().navigateTo('app/index.html#/contacts/len');
  });
  
  it('should display Len page properly', function() {
    expect(binding('contact.first')).toBe('Len');
	expect(binding('contact.last')).toBe('Payne');
  });
  
  it('should have a link back to the contact list at the top of the page', function() {
    element('a:first').click();
	expect(browser().location().url()).toBe('/contacts');
  });
});