'use strict';

/* Assignment #1 End-to-End Testing
 * Prepared By: Len Payne
 * For: CPD-3262
 * 2014/01/07
 */
/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Contact List App', function() {

  beforeEach(function() {
    browser().navigateTo('app/index.html');
  });

  it('should have four tr elements with the class "contact"', function() {
	expect(repeater('tr.contact').count()).toBe(4);
  });
  
  it('should filter on Cooper to only two results', function() {
	input('query').enter('Cooper');
    expect(repeater('tr.contact').count()).toBe(2);
  });

  it('should filter on o to only three results', function() {
	input('query').enter('o');
    expect(repeater('tr.contact').count()).toBe(3);
  });

  it('should order correctly by Extension', function() {
	input('query').enter('33');
	select('orderProp').option('Extension');
	expect(repeater('tr.contact', 'Contact List').column('contact.first')).
          toEqual(["Liane", "Rick"]);
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

  it('should include all the original first names', function() {
	select('orderProp').option('First Name');
	expect(repeater('tr.contact', 'Contact List').column('contact.first')).
          toEqual(["Jim", "Len", "Liane", "Rick"]);		
  });
  
  it('should include all the original last names', function() {
	select('orderProp').option('First Name');
	expect(repeater('tr.contact', 'Contact List').column('contact.last')).
          toEqual(["Cooper", "Payne", "Cooper", "Brown"]);		
  });
  
  it('should correctly construct the E-Mail as "len.payne@lambtoncollege.ca"', function() {
	input('query').enter('Len');
	expect(element('tr.contact td.email').text()).toMatch(/^len\.payne@lambtoncollege\.ca$/i);          
  });
  
  it('should correctly construct the Phone Number as "519-542-7751 ext. 3418"', function() {
	input('query').enter('Len');
	expect(element('tr.contact td.phone').text()).toMatch(/^519-542-7751 ext\. 3418$/i);          
  });
  
});
